import "./yt-player.css";

type YTPlayerProps = {
  src: string;
};

const YTPlayer = (props: YTPlayerProps) => {
  return (
    <iframe
      className={"youtube-player"}
      src={props.src}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default YTPlayer;
