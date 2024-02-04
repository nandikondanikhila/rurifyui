const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 ">
      <div className="w-11/12 m-auto grid md:grid-cols-2 gap-5">
        <div>
         
          <div className="mt-4 text-lg font-semibold">Rurify - Simplifying Rural Living</div>

          <p className="mt-2 text-xs w-8/12 text-slate-200">
            Rurify is your go-to platform for simplifying rural living. We
            strive to connect rural communities, provide essential services, and
            enhance the overall quality of life in rural areas. Join us in
            making rural living more accessible and enjoyable.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-between md:space-x-4">
          <div className="text-left">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul>
              <li className="hover:text-slate-300">
                <a href="#">Home</a>
              </li>
              <li className="hover:text-slate-300">
                <a href="#">About Us</a>
              </li>
              <li className="hover:text-slate-300">
                <a href="#">Services</a>
              </li>
              <li className="hover:text-slate-300">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p>Email: info@rurify.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">&copy; 2024 Rurify. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
