import { ClipLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#36d7b7" loading={loading} />
    </div>
  );
};

export default Spinner;
