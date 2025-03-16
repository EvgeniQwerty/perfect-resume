import { ResumeData } from "../../types";

interface HeaderProps {
  data: ResumeData['personalInfo'];
}

const Header = ({ data }: HeaderProps) => {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {data.fullName}
      </h1>
      {data.location && (
        <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
          {data.location}
        </p>
      )}
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
        {data.email}
        {data.linkedin && ` | ${data.linkedin}`}
        {data.phone && ` | ${data.phone}`}
        {data.telegram && ` | ${data.telegram}`}
      </p>
    </div>
  );
};

export default Header;