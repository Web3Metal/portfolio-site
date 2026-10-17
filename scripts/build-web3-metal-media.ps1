param(
  [Parameter(Mandatory=$true)][string]$Ffmpeg,
  [Parameter(Mandatory=$true)][string]$NewsletterCover
)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$source = 'D:\Media Library\Video\YT video web3metal music monday.mp4'
$outputRoot = Join-Path $projectRoot 'public/assets/web3-metal'
if (!(Test-Path -LiteralPath $source)) { throw "Missing approved source: $source" }
if (!(Test-Path -LiteralPath $NewsletterCover)) { throw 'Missing approved Issue 32 cover' }
function Run-Media([string[]]$MediaArgs) {
  & $Ffmpeg @MediaArgs
  if ($LASTEXITCODE -ne 0) { throw 'Media processing failed; source files remain unchanged.' }
}
$video = Join-Path $outputRoot 'music-monday-web.mp4'
if (!(Test-Path -LiteralPath $video)) {
  Run-Media @('-n','-hide_banner','-loglevel','error','-i',$source,'-vf','scale=1280:720,setsar=1','-r','30','-c:v','libx264','-pix_fmt','yuv420p','-preset','fast','-crf','25','-maxrate','1800k','-bufsize','3600k','-threads','2','-c:a','aac','-b:a','128k','-movflags','+faststart',$video)
}
$poster = Join-Path $outputRoot 'music-monday-poster.jpg'
if (!(Test-Path -LiteralPath $poster)) {
  Run-Media @('-n','-hide_banner','-loglevel','error','-ss','8','-i',$source,'-frames:v','1','-vf','scale=1280:720','-q:v','3',$poster)
}
$cover = Join-Path $outputRoot 'newsletter-issue-32.jpg'
if (!(Test-Path -LiteralPath $cover)) {
  Run-Media @('-n','-hide_banner','-loglevel','error','-i',$NewsletterCover,'-frames:v','1','-vf','scale=1600:-1','-q:v','2',$cover)
}
Get-Item -LiteralPath $video,$poster,$cover | Select-Object Name,Length
