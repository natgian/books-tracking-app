import "./PageTitle.css";

const PageTitle = ({ text, lineWidth }) => {
  return (
    <>
      <h1 className="page-title">{text}</h1>
      <div className="page-title-underline" style={{ width: lineWidth }}></div>
    </>
  );
};
export default PageTitle;
