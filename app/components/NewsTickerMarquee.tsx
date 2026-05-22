"use client";

type TickerHeadline = {
  tag: string;
  text: string;
};

type Props = {
  headlines: TickerHeadline[];
};

const NewsTickerMarquee = ({ headlines }: Props) => {
  const buildTrack = (items: TickerHeadline[]) =>
    items.map((h, i) => (
      <span key={i} className="ticker-item">
        <span className="ticker-tag">{h.tag}</span>
        {h.text}
        <span className="ticker-sep">◆</span>
      </span>
    ));

  return (
    <div className="ticker-wrap">
      <div className="ticker-label">
        <span className="live-dot" />
        BREAKING
      </div>
      <div className="ticker-track-wrap">
        <div className="ticker-track">
          {buildTrack(headlines)}
          {buildTrack(headlines)}
        </div>
      </div>
      <div className="fade-right" />
    </div>
  );
};

export default NewsTickerMarquee;