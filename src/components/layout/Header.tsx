function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">RedeemWise</span>
          </div>
          <nav className="flex items-center space-x-6">
            <span className="text-gray-400 text-sm">Navigation</span>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
