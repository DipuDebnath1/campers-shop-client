import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

type TeamMember = {
    name: string;
    role: string;
    bio: string;
    photoUrl: string;
  };
  
  const teamMembers: TeamMember[] = [
    {
      name: 'John Doe',
      role: 'CEO',
      bio: 'John is the visionary behind our company and is passionate about outdoor adventures.',
      photoUrl: 'https://i.ibb.co.com/TLNKqt4/images.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'COO',
      bio: 'Jane ensures smooth operations and loves hiking in her free time.',
      photoUrl: 'https://i.ibb.co.com/tCp6Hsn/images.jpg',
    },
  
  ];
const About = () => {
    return (
        <div className="container mx-auto p-8">
      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p><strong>Phone:</strong> +1-234-567-890</p>
        <p><strong>Email:</strong> info@example.com</p>
        <p><strong>Address:</strong> 123 Adventure Lane, Hike City, Country</p>
      </section>

      {/* Google Map */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.95373631531594!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1c2df07%3A0x5045675218ce7e33!2sGoogle!5e0!3m2!1sen!2sus!4v1637645685069!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </section>

      {/* Social Media Links */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">
            <FaFacebook size={30} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
            <FaTwitter size={30} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600">
            <FaInstagram size={30} />
          </a>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p>
          At Adventure Shop, our mission is to provide high-quality, reliable outdoor gear that empowers adventurers of all
          kinds to explore the world. We believe in sustainability, community, and creating gear that lasts.
        </p>
      </section>

      {/* Team Members */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white p-4 rounded shadow-lg text-center">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <p className="text-gray-800">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    );
};

export default About;