import Container from "../ui/Container";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-default">
      <Container>
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-navy">RedeemWise</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <span className="text-[0.9375rem] font-medium text-text-secondary cursor-default">
              Nav Links
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-[0.9375rem] font-semibold text-primary cursor-default">
              CTA Button
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
