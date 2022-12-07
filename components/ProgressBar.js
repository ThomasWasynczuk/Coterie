const ProgressBar = ({ value }) => {
  return (
    <div className="bg-slate-300 w-full h-4 rounded-full overflow-hidden">
      <div
        className={`bg-accent h-full w-[${value}%] rounded-full flex justify-center`}
      >
        <span className="text-white text-[11px]">{`${value}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
