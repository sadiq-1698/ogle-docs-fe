// Added this component for a very weird issue that happens with bg colors

const BgColorTempSolution = () => {
  return (
    <div className="hidden">
      <div className="bg-purple-800"></div>
      <div className="bg-green-1"></div>
      <div className="bg-grey-10"></div>
      <div className="bg-green-800"></div>
      <div className="bg-gray-800"></div>
    </div>
  );
};

export default BgColorTempSolution;
