import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  const currentDate = new Date().toLocaleDateString()

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-gray-800 border-t border-gray-700 mt-12">
      
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Smart Study Planner
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Organize • Learn • Achieve
          </p>
        </div>

        {/* Footer Info */}
        <div className="text-center md:text-right mt-4 md:mt-0">

          <p className="text-gray-300 text-sm">
            © {currentYear} All Rights Reserved
          </p>

          <p className="text-gray-500 text-xs mt-1">
            {currentDate}
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer