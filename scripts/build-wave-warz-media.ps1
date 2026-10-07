param([Parameter(Mandatory=$true)][string]$Ffmpeg)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$sourceRoot = Join-Path $projectRoot 'Media Library/00-inbox/Wave-warz/Music Videos'
$outputRoot = Join-Path $projectRoot 'public/assets/wave-warz'
$scratchRoot = Join-Path ([System.IO.Path]::GetTempPath()) ('wave-warz-edit-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $outputRoot,$scratchRoot -Force | Out-Null
$clips = @(
  @{ File='Rid This Rock of Disasters.mp4'; Slug='rid-this-rock-of-disasters'; Start=178; Length=14 },
  @{ File='It Says a Thousand Things WWz Vid.mp4'; Slug='it-says-a-thousand-things'; Start=114; Length=3 },
  @{ File='Ominous Eyes - Official Video.mp4'; Slug='ominous-eyes'; Start=36; Length=9 },
  @{ File='Gotta Catch Them All (b0di3s).mp4'; Slug='gotta-catch-em-all-bodies'; Start=225; Length=5 },
  @{ File='Waves of Blood.mp4'; Slug='waves-of-blood'; Start=198; Length=10 }
)
function Run-Media([string[]]$MediaArgs) {
  & $Ffmpeg @MediaArgs
  if ($LASTEXITCODE -ne 0) { throw 'Media processing failed; source files have not been altered.' }
}
foreach ($clip in $clips) {
  $source = Join-Path $sourceRoot $clip.File
  if (!(Test-Path -LiteralPath $source)) { throw "Missing exact source: $source" }
  Write-Output "Processing $($clip.File)"
  $full = Join-Path $outputRoot ($clip.Slug + '.mp4')
  if (!(Test-Path -LiteralPath $full)) {
    Run-Media @('-n','-hide_banner','-loglevel','error','-i',$source,'-vf','scale=1280:720,setsar=1','-r','30','-c:v','libx264','-preset','medium','-crf','26','-maxrate','1800k','-bufsize','3600k','-threads','2','-c:a','aac','-b:a','128k','-movflags','+faststart',$full)
  }
  $poster = Join-Path $outputRoot ($clip.Slug + '-poster.jpg')
  if (!(Test-Path -LiteralPath $poster)) {
    Run-Media @('-n','-hide_banner','-loglevel','error','-ss',"$($clip.Start)",'-i',$source,'-frames:v','1','-vf','scale=1280:720','-q:v','3',$poster)
  }
  Run-Media @('-n','-hide_banner','-loglevel','error','-ss',"$($clip.Start)",'-i',$source,'-t',"$($clip.Length)",'-vf','scale=960:540,setsar=1','-r','30','-c:v','libx264','-preset','fast','-crf','20','-threads','2','-c:a','aac','-ar','48000','-b:a','160k',(Join-Path $scratchRoot ($clip.Slug + '.mp4')))
}
$trailer = Join-Path $outputRoot 'featured-battles-trailer.mp4'
if (!(Test-Path -LiteralPath $trailer)) {
  $inputArgs = @('-n','-hide_banner','-loglevel','error')
  foreach ($clip in $clips) { $inputArgs += @('-i',(Join-Path $scratchRoot ($clip.Slug + '.mp4'))) }
  $filter = '[0:v]settb=AVTB,setpts=PTS-STARTPTS[v0];[1:v]settb=AVTB,setpts=PTS-STARTPTS[v1];[2:v]settb=AVTB,setpts=PTS-STARTPTS[v2];[3:v]settb=AVTB,setpts=PTS-STARTPTS[v3];[4:v]settb=AVTB,setpts=PTS-STARTPTS[v4];[v0][v1]xfade=transition=fade:duration=0.5:offset=13.5[x1];[x1][v2]xfade=transition=fade:duration=0.5:offset=16[x2];[x2][v3]xfade=transition=fade:duration=0.5:offset=24.5[x3];[x3][v4]xfade=transition=fade:duration=0.5:offset=29,fade=t=in:st=0:d=0.35,fade=t=out:st=38.65:d=0.35[v];[0:a][1:a]acrossfade=d=0.5:c1=tri:c2=tri[a1];[a1][2:a]acrossfade=d=0.5:c1=tri:c2=tri[a2];[a2][3:a]acrossfade=d=0.5:c1=tri:c2=tri[a3];[a3][4:a]acrossfade=d=0.5:c1=tri:c2=tri,afade=t=in:st=0:d=0.35,afade=t=out:st=38.65:d=0.35[a]'
  # Chained xfade outputs lose frame-rate metadata unless each input is normalized.
  $filter = $filter.Replace('settb=AVTB,setpts=PTS-STARTPTS', 'settb=1/30,setpts=PTS-STARTPTS,fps=30').Replace('[x1];','[xf1];[xf1]fps=30[x1];').Replace('[x2];','[xf2];[xf2]fps=30[x2];').Replace('[x3];','[xf3];[xf3]fps=30[x3];')
  Run-Media ($inputArgs + @('-filter_complex_threads','1','-filter_complex',$filter,'-map','[v]','-map','[a]','-c:v','libx264','-pix_fmt','yuv420p','-preset','medium','-crf','24','-maxrate','1400k','-bufsize','2800k','-threads','2','-c:a','aac','-b:a','128k','-movflags','+faststart',$trailer))
}
$trailerPoster = Join-Path $outputRoot 'featured-battles-poster.jpg'
if (!(Test-Path -LiteralPath $trailerPoster)) {
  Run-Media @('-n','-hide_banner','-loglevel','error','-ss','5','-i',$trailer,'-frames:v','1','-q:v','3',$trailerPoster)
}
Get-ChildItem -LiteralPath $outputRoot -File | Select-Object Name,Length
