import Container from "../ui/Container";

function Footer() {
  return (
    <footer className="bg-[#000000]">
      <Container>
        <div className="flex items-center justify-between h-14 sm:h-16 py-4">
          <div className="flex items-center gap-6">
            <span className="text-[0.8125rem] text-slate-400 cursor-default">
              Terms & Support
            </span>
            <span className="text-[0.8125rem] text-slate-400 cursor-default">
              Privacy Policy
            </span>
          </div>
          <span className="text-[0.8125rem] text-slate-500">
            &copy; {new Date().getFullYear()} RedeemWise
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
