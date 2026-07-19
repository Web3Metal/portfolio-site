#!/usr/bin/env python3
"""Generate Shawn Porter's public two-page resume PDF.

Run from anywhere with the repository's Python environment:
    python scripts/generate-resume.py
"""

from __future__ import annotations

from html import escape
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Shawn-Porter-Resume.pdf"

INK = colors.HexColor("#171512")
MUTED = colors.HexColor("#5F5A52")
RUST = colors.HexColor("#9C3726")
RULE = colors.HexColor("#C8C0B4")

SUMMARY = (
    "Growth, community, and content strategist who finds the missing system behind an idea, "
    "then builds the content, community, or product that makes it work. Experience spans "
    "developer engagement, creator ecosystems, audience growth, editorial operations, video "
    "and podcast production, and emerging technology. Combines strategy with hands-on "
    "execution across onboarding, programming, analytics, publishing, and cross-functional delivery."
)

SKILLS = (
    "Developer Engagement | Community Growth | Creator Ecosystems | Content Strategy | "
    "Growth Operations | Audience Development | Podcast and Video Production | Analytics and Reporting"
)

PROFESSIONAL_EXPERIENCE = [
    (
        "AVA LABS",
        "Developer Engagement Manager",
        "Oct 2024 – Oct 2025",
        [
            "Managed developer engagement through Sprinklr, identifying and nurturing promising builders, segmenting audiences, improving onboarding, and routing qualified leads to Avalanche programs and deeper technical support.",
            "Engaged 9,000+ developers and drove 6,900+ visits to Avalanche programs, resources, and events.",
            "Managed 4,400+ initial interactions, 3,500+ continued conversations, and 600+ follow-ups.",
            "Helped double program conversions from Q1 to Q2, contributed to a 29% improvement in clicks per message, and supported a 229% month-over-month increase in Elevate conversions.",
            "Ranked among the team's strongest performers for click-through rate and lead discovery.",
        ],
    ),
    (
        "EDGE OF COMPANY",
        "Web3 Social Media Manager & Podcast Producer",
        "Jan 2022 – Dec 2022",
        [
            "Managed the production and distribution workflow for interview programming, including branded recordings, quality control, editing, social clips, supporting assets, and publishing across podcast and video platforms.",
            "Generated 24,300 additional profile visits, grew followers by 35%, added 4,000+ followers in 30 days, and increased impressions by 28% in 30 days.",
            "Added 193 YouTube subscribers, generated 17,800 additional YouTube views, and added 49.4 hours of YouTube watch time.",
        ],
    ),
    (
        "FIGHT LEGENDS",
        "Web3 Gaming Community Lead",
        "Jan 2021 – Dec 2021",
        [
            "Created and ran a recurring development show that turned weekly product progress into a steady stream of community-facing content.",
            "Owned the show concept, format, visual direction, editing, and social distribution while supporting Discord events, AMAs, contests, and paid promotion.",
            "Increased YouTube subscribers by 25% and social engagement by approximately 30%.",
            "Produced roughly 25–35 development-show episodes and an estimated 75–140 short-form clips across the year.",
        ],
    ),
    (
        "COINTELEGRAPH MEDIA",
        "Social Media & Content Manager",
        "2020",
        [
            "Managed social content for approximately 2–3 blockchain clients, translating technical products and campaign goals into clear copy, visual briefs, publishing plans, and platform-specific posts.",
            "Coordinated with designers, scheduled and published content, and used performance data to refine future work.",
            "Maintained distinct client voices while applying a repeatable workflow across copy, design coordination, publishing, and optimization.",
        ],
    ),
]

FOUNDER_PROJECTS = [
    (
        "WEB3 METAL",
        "Founder",
        "Oct 2023 – Present",
        [
            "Founded Web3 Metal and continue to lead its growth as a creator ecosystem spanning editorial coverage, Discord programming, competitions, collaborations, creator support, and product experiments.",
            "Built a community of 192 Discord members and published 27 newsletter issues.",
            "Maintained a 37.59% newsletter open rate and achieved a 20% click-to-open rate.",
            "Helped launch Cyber Metal Radio as a separate community-led project.",
        ],
    ),
    (
        "CYBER METAL RADIO",
        "Co-Founder and Growth Lead",
        "Oct 2023 – Present",
        [
            "Led zero-to-one marketing and growth, recruiting artists and building recurring submission, ranking, live-programming, and recognition systems.",
            "Generated 1,765 artist submissions, 200,000+ listens, and 16,000+ community interactions in 2025.",
            "Established New Metal Monday, the weekly Top 15 countdown, and an annual awards program as recurring reasons for creators to submit, listen, share, and return.",
        ],
    ),
]

FREELANCE = (
    "FREELANCE",
    "Multimedia Journalist | Freelance & Contract",
    "Aug 2015 – Oct 2023",
    [
        "Reported and produced multimedia work across politics, culture, music, technology, civic forums, and live events.",
        "Work included reporting, editing, livestream production, music coverage, and independent media.",
    ],
)

RECOGNITION = [
    "Winner, Summer of Suno I",
    "Winner, Summer of Suno II",
    "Winner, Wave Warz 44",
    "Best Song 2025, Cyber Metal Radio",
    "Best Doom Song 2025, Cyber Metal Radio",
]


def register_fonts() -> None:
    import reportlab

    font_dir = Path(reportlab.__file__).resolve().parent / "fonts"
    pdfmetrics.registerFont(TTFont("ResumeSans", str(font_dir / "Vera.ttf")))
    pdfmetrics.registerFont(TTFont("ResumeSans-Bold", str(font_dir / "VeraBd.ttf")))


def build_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name", parent=base["Normal"], fontName="ResumeSans-Bold", fontSize=20,
            leading=23, textColor=INK, alignment=TA_CENTER, spaceAfter=2,
        ),
        "headline": ParagraphStyle(
            "Headline", parent=base["Normal"], fontName="ResumeSans-Bold", fontSize=9.4,
            leading=11.2, textColor=RUST, alignment=TA_CENTER, spaceAfter=4,
        ),
        "contact": ParagraphStyle(
            "Contact", parent=base["Normal"], fontName="ResumeSans", fontSize=7.3,
            leading=9.2, textColor=MUTED, alignment=TA_CENTER, spaceAfter=7,
        ),
        "section": ParagraphStyle(
            "Section", parent=base["Normal"], fontName="ResumeSans-Bold", fontSize=9.4,
            leading=11, textColor=RUST, spaceBefore=10, spaceAfter=4,
            borderWidth=0, borderPadding=0,
        ),
        "body": ParagraphStyle(
            "Body", parent=base["Normal"], fontName="ResumeSans", fontSize=8.1,
            leading=10.2, textColor=INK, alignment=TA_LEFT, spaceAfter=3,
        ),
        "skills": ParagraphStyle(
            "Skills", parent=base["Normal"], fontName="ResumeSans", fontSize=7.7,
            leading=9.6, textColor=INK, spaceAfter=3,
        ),
        "role": ParagraphStyle(
            "Role", parent=base["Normal"], fontName="ResumeSans", fontSize=8.2,
            leading=10.2, textColor=INK, spaceBefore=6, spaceAfter=2,
        ),
        "bullet": ParagraphStyle(
            "Bullet", parent=base["Normal"], fontName="ResumeSans", fontSize=7.6,
            leading=9.5, textColor=INK, leftIndent=9, firstLineIndent=-7,
            spaceAfter=2,
        ),
        "small": ParagraphStyle(
            "Small", parent=base["Normal"], fontName="ResumeSans", fontSize=7.8,
            leading=9.8, textColor=INK, spaceAfter=2,
        ),
    }


def section_title(story: list, text: str, styles: dict[str, ParagraphStyle]) -> None:
    story.append(Paragraph(escape(text.upper()), styles["section"]))
    story.append(Paragraph("_" * 154, ParagraphStyle(
        "Rule", parent=styles["body"], fontName="ResumeSans", fontSize=2.2,
        leading=2.2, textColor=RULE, spaceAfter=2,
    )))


def bullet(text: str, styles: dict[str, ParagraphStyle]) -> Paragraph:
    return Paragraph(f"- {escape(text)}", styles["bullet"])


def add_role(story: list, role: tuple, styles: dict[str, ParagraphStyle]) -> None:
    organization, title, dates, bullets = role
    heading = Paragraph(
        f"<b>{escape(organization)}</b> | {escape(title)} | {escape(dates)}",
        styles["role"],
    )
    story.append(KeepTogether([heading, bullet(bullets[0], styles)]))
    for item in bullets[1:]:
        story.append(bullet(item, styles))


def decorate_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setTitle("Shawn Porter Resume")
    canvas.setAuthor("Shawn Porter")
    canvas.setSubject("Growth, Community and Content Strategy")
    canvas.setFont("ResumeSans", 6)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.52 * inch, 0.27 * inch, "SHAWN PORTER")
    canvas.drawRightString(letter[0] - 0.52 * inch, 0.27 * inch, f"PAGE {doc.page} OF 2")
    canvas.restoreState()


class ResumeCanvas(Canvas):
    """Use an embedded face as the canvas default, avoiding a stray Helvetica resource."""

    def __init__(self, *args, **kwargs):
        kwargs["initialFontName"] = "ResumeSans"
        kwargs["initialFontSize"] = 8
        super().__init__(*args, **kwargs)


def build_pdf() -> None:
    register_fonts()
    styles = build_styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.52 * inch,
        rightMargin=0.52 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.46 * inch,
        title="Shawn Porter Resume",
        author="Shawn Porter",
        subject="Growth, Community and Content Strategy",
        pageCompression=1,
    )

    story: list = [
        Paragraph("SHAWN PORTER", styles["name"]),
        Paragraph("GROWTH, COMMUNITY &amp; CONTENT STRATEGIST", styles["headline"]),
        Paragraph(
            "Seattle, WA | shawnport84@gmail.com | "
            '<link href="https://linkedin.com/in/shawnsporter">linkedin.com/in/shawnsporter</link><br/>'
            '<link href="https://authory.com/Shawnsporter">authory.com/Shawnsporter</link> | '
            '<link href="https://hyperfollow.com/r3plic4nt">hyperfollow.com/r3plic4nt</link>',
            styles["contact"],
        ),
    ]
    section_title(story, "Professional Summary", styles)
    story.append(Paragraph(escape(SUMMARY), styles["body"]))
    section_title(story, "Core Skills", styles)
    story.append(Paragraph(escape(SKILLS), styles["skills"]))
    section_title(story, "Professional Experience", styles)
    for role in PROFESSIONAL_EXPERIENCE:
        add_role(story, role, styles)

    story.append(PageBreak())
    section_title(story, "Founder-Led Projects", styles)
    for role in FOUNDER_PROJECTS:
        add_role(story, role, styles)
    section_title(story, "Earlier Experience", styles)
    add_role(story, FREELANCE, styles)
    section_title(story, "Education", styles)
    story.append(Paragraph("<b>UNIVERSITY OF WASHINGTON</b>", styles["small"]))
    story.append(Paragraph("Bachelor of Arts — Journalism &amp; Political Science", styles["small"]))
    section_title(story, "Selected Recognition", styles)
    for item in RECOGNITION:
        story.append(bullet(item, styles))
    story.append(Spacer(1, 6))

    doc.build(
        story,
        onFirstPage=decorate_page,
        onLaterPages=decorate_page,
        canvasmaker=ResumeCanvas,
    )

    reader = PdfReader(str(OUTPUT), strict=True)
    if len(reader.pages) != 2:
        raise RuntimeError(f"Expected exactly 2 pages, generated {len(reader.pages)}")
    extracted = "\n".join(page.extract_text() or "" for page in reader.pages)
    for required in ("AVA LABS", "WEB3 METAL", "CYBER METAL RADIO", "UNIVERSITY OF WASHINGTON"):
        if required not in extracted:
            raise RuntimeError(f"Generated PDF is missing expected text: {required}")
    print(f"Generated {OUTPUT} ({OUTPUT.stat().st_size:,} bytes, 2 pages)")


if __name__ == "__main__":
    build_pdf()
