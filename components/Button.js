const Button = ({ label, Icon, styles, onClick }) => {
  return (
    <div
      className={`center bg-primary text-white font-bold px-8 py-4 rounded-md cursor-pointer hover:opacity-80 transition-all ${styles}`}
      onClick={onClick}
    >
      {Icon ? <span className="text-[30px] mr-4">{Icon}</span> : null}
      {label}
    </div>
  );
};

export default Button;
