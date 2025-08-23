export default function Header() {
  return (
    <header
      className="bg-[#242424] text-white flex items-center pb-2 mb-4 border-b border-[#E3E3E350] shadow-sm"
    >
      <img
        src="/LogoNoBG.png"
        alt="NHL Era Simulator Logo"
        className="select-none"
        width={80}
        height={80}
      />
    </header>
  );
}
