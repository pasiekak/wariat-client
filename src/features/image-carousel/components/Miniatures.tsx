import IImage from "../../dashboard/features/images/types/IImage";

type MiniaturesProps = {
  images: IImage[];
  onClick: (id: number) => void;
};

const Miniatures = (props: MiniaturesProps) => {
  return (
    <div className={`miniatures`}>
      {props.images.map((img) => (
        <div
          onClick={() => props.onClick(img.id)}
          className="miniature"
          style={{ backgroundImage: `url('/api/images/${img.id}')` }}
          key={img.id}
        ></div>
      ))}
    </div>
  );
};

export default Miniatures;
