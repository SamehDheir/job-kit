import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Grid Layout for Responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div>
            <h2 className="text-primary text-xl font-semibold mb-2">
              Future Resume
            </h2>
            <p className="text-sm mb-4">
              Create your resume in a minute, get your dream job in a blink.
            </p>

            <ul className="flex space-x-4 text-lg">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>

          {/* Terms & Policies */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Terms & Policies</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  (+234) 8089466435
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  agencycr@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-600"></div>

        {/* Footer Bottom */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} Future Resume. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
