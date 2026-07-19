import Link from "next/link";
import styles from "./homepage.module.css";

type SectionLink = {
  href: string;
  label: string;
};

type HomepageSectionHeaderProps = {
  number: string;
  title: string;
  headingId: string;
  link?: SectionLink;
};

type EditorialMediaProps = {
  image?: {
    src: string;
    alt: string;
    position?: string;
  };
  label: string;
  typography?: readonly string[];
};

type FeaturedCaseStudyProps = {
  number: string;
  title: string;
  role: string;
  summary: string;
  href: string;
  proofPoint: string;
  image?: EditorialMediaProps["image"];
  mediaLabel: string;
  typography?: readonly string[];
  reverse?: boolean;
};

type ProcessItem = {
  title: string;
  copy: string;
};

type ExperimentFeatureProps = {
  number: string;
  category: string;
  status: string;
  title: string;
  copy: string;
  image: {
    src: string;
    alt: string;
  };
};

export function HomepageSectionHeader({ number, title, headingId, link }: HomepageSectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.sectionNumber}>{number}</p>
      <h2 id={headingId}>{title}</h2>
      {link ? <Link className={styles.sectionLink} href={link.href}>{link.label} <span>↗</span></Link> : null}
    </div>
  );
}

export function EditorialMedia({ image, label, typography }: EditorialMediaProps) {
  if (image) {
    return (
      <figure className={styles.editorialMedia}>
        <img src={image.src} alt={image.alt} style={image.position ? { objectPosition: image.position } : undefined} />
        <figcaption>{label}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`${styles.editorialMedia} ${styles.typographyMedia}`}>
      <figcaption>{label}</figcaption>
      <ol>
        {typography?.map((item, index) => (
          <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>
        ))}
      </ol>
    </figure>
  );
}

export function FeaturedCaseStudy({
  number,
  title,
  role,
  summary,
  href,
  proofPoint,
  image,
  mediaLabel,
  typography,
  reverse = false,
}: FeaturedCaseStudyProps) {
  return (
    <article className={`${styles.featuredCase} ${reverse ? styles.featuredCaseReverse : ""}`}>
      <EditorialMedia image={image} label={mediaLabel} typography={typography} />
      <div className={styles.featuredCopy}>
        <p className={styles.caseNumber}>{number}</p>
        <h3><Link href={href}>{title}</Link></h3>
        <div className={styles.caseRole}>
          <span>Role</span>
          <p>{role}</p>
        </div>
        <p className={styles.caseSummary}>{summary}</p>
        <div className={styles.proofPoint}>
          <span>Selected result</span>
          <strong>{proofPoint}</strong>
        </div>
        <Link className={styles.caseLink} href={href}>Read case study <span>↗</span></Link>
      </div>
    </article>
  );
}

export function ProcessRail({ items }: { items: readonly ProcessItem[] }) {
  return (
    <ol className={styles.processRail}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span className={styles.processIndex}>0{index + 1}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </li>
      ))}
    </ol>
  );
}

export function ExperimentFeature({ number, category, status, title, copy, image }: ExperimentFeatureProps) {
  return (
    <article className={styles.experimentFeature}>
      <figure><img src={image.src} alt={image.alt} /></figure>
      <div>
        <p className={styles.experimentKicker}><span>{number}</span>{category} / {status}</p>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </article>
  );
}
