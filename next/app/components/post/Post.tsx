interface postProps {
  auther: string;
  date?: string;
  body: string;
}

export default function ({ auther, date, body }: postProps) {
  return (
    <div className="post-container post-box shadow-md  flex flex-col">
      {/* <p className="title-md">tilte :{title}</p> */}
      <p className="font-md">auther : {auther}</p>
      {date && <p className="font-sm">date : {date}</p>}

      <p className="font-md">
        <label className="mb-4">body</label>

        <p>{body}</p>
      </p>
    </div>
  );
}
