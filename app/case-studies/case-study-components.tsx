import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "../site-components";
import styles from "./case-study.module.css";

type CaseStudyPageProps = {
  children: ReactNode;
};

type CaseStudyHeroProps = {
  index: string;
  date: string;
  title: string;
  context: string;
  tags: readonly string[];
  visual?: ReactNode;
};

type CaseStudySectionProps = {
  number: string;
  title: string;
  headingId: string;
  variant?: "default" | "system" | "lessons";
  children: ReactNode;
};

type RoleContentProps = {
  overview: string;
  scope: readonly string[];
};

type SystemNode = {
  label: string;
  title: string;
  details?: readonly string[];
  columns?: readonly (readonly string[])[];
};

type SystemFlowProps = {
  nodes: readonly SystemNode[];
  caption: string;
};

type Metric = {
  value: string;
  label: string;
};

type ProgressionFigureProps = {
  title: string;
  eyebrow: string;
  metrics: readonly (Metric & { stage: string })[];
  caption: string;
};

type EvidenceItem = {
  value?: string;
  label?: string;
  text?: string;
};

type AssetCard = {
  eyebrow: string;
  title: string;
  caption: string;
};

export function CaseStudyPage({ children }: CaseStudyPageProps) {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>{children}</main>
      <SiteFooter />
    </>
  );
}

export function CaseStudyHero({ index, date, title, context, tags, visual }: CaseStudyHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroTop}>
        <p>{index} / Case Study</p>
        <p>{date}</p>
      </div>
      <h1>{title}</h1>
      {visual ? (
        <div className={styles.heroContextRow}>
          <div className={styles.heroVisual}>{visual}</div>
          <p className={styles.context}>{context}</p>
        </div>
      ) : (
        <p className={styles.context}>{context}</p>
      )}
      <div className={styles.tags} aria-label="Case study tags">
        {tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </header>
  );
}

export function CaseStudySection({ number, title, headingId, variant = "default", children }: CaseStudySectionProps) {
  const sectionClassName = [
    styles.section,
    variant === "system" ? styles.systemSection : "",
    variant === "lessons" ? styles.lessonsSection : "",
  ].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName} aria-labelledby={headingId}>
      <div className={styles.sectionLabel}><span>{number}</span><h2 id={headingId}>{title}</h2></div>
      {children}
    </section>
  );
}

export function ProseLead({ children }: { children: ReactNode }) {
  return <div className={styles.proseLead}>{children}</div>;
}

export function RoleContent({ overview, scope }: RoleContentProps) {
  return (
    <div className={styles.roleContent}>
      <p className={styles.roleOverview}>{overview}</p>
      <ol className={styles.scopeList}>
        {scope.map((item, index) => <li key={item}><span>{String.fromCharCode(65 + index)}</span><p>{item}</p></li>)}
      </ol>
    </div>
  );
}

export function SystemFlow({ nodes, caption }: SystemFlowProps) {
  return (
    <figure className={styles.systemFigure}>
      <div className={styles.systemRail}>
        {nodes.map((node, index) => (
          <div key={node.label} style={{ display: "contents" }}>
            {index > 0 ? <div className={styles.systemArrow} aria-hidden="true">→</div> : null}
            <div className={`${styles.systemNode} ${node.columns ? styles.routingNode : ""}`}>
              <small>{node.label}</small>
              <strong>{node.title}</strong>
              {node.details?.map((detail) => <span key={detail}>{detail}</span>)}
              {node.columns ? (
                <div className={styles.routeColumns}>
                  {node.columns.map((column, columnIndex) => (
                    <div key={`${node.label}-${columnIndex}`}>
                      {column.map((detail) => <span key={detail}>{detail}</span>)}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function OutcomePair({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <div className={styles.outcomePair}>
      {metrics.map((metric) => <p key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></p>)}
    </div>
  );
}

export function ProgressionFigure({ title, eyebrow, metrics, caption }: ProgressionFigureProps) {
  return (
    <figure className={styles.progressFigure}>
      <div className={styles.figureHeading}><p>{title}</p><span>{eyebrow}</span></div>
      <div className={styles.progression}>
        {metrics.map((metric) => (
          <div key={metric.stage}><small>{metric.stage}</small><strong>{metric.value}</strong><span>{metric.label}</span></div>
        ))}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function EvidenceGrid({ items }: { items: readonly EvidenceItem[] }) {
  return (
    <div className={styles.evidenceGrid}>
      {items.map((item) => (
        <article key={item.text ?? item.label}>
          {item.text ? <p>{item.text}</p> : <><strong>{item.value}</strong><span>{item.label}</span></>}
        </article>
      ))}
    </div>
  );
}

export function AssetCards({ cards }: { cards: readonly AssetCard[] }) {
  return (
    <div className={styles.assetCards}>
      {cards.map((card) => <article key={card.title}><span>{card.eyebrow}</span><h3>{card.title}</h3><p>{card.caption}</p></article>)}
    </div>
  );
}

export function LessonsList({ lessons }: { lessons: readonly string[] }) {
  return <ul className={styles.lessonsList}>{lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>;
}
