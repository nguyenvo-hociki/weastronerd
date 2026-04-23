import { useNavigate } from 'react-router-dom';
import FuzzyText from '../components/FuzzyText';
import ArtistSocialLinks from '../components/ArtistSocialLinks';
import '../styles/artists.css';

const artists = [
  {
    name: 'Eddie.P',
    path: '/artists/eddie-p',
    socials: {
      facebook: 'https://www.facebook.com/eddie.astronerd',
      instagram: 'https://www.instagram.com/eddie.astronerd',
      spotify: 'https://open.spotify.com/artist/3RnnbCQbWxFVHxdfY4uCpu'
    }
  },
  {
    name: 'Julun',
    path: '/artists/julun',
    socials: {
      facebook: 'https://www.facebook.com/julun.astronerd',
      instagram: 'https://www.instagram.com/julun.astronerd',
      spotify: 'https://open.spotify.com/artist/3RnnbCQbWxFVHxdfY4uCpu'
    }
  },
  {
    name: 'Kin6',
    path: '/artists/kin6',
    socials: {
      facebook: 'https://www.facebook.com/hociki',
      instagram: 'https://www.instagram.com/kin6.astronerd',
      spotify: 'https://open.spotify.com/artist/3RnnbCQbWxFVHxdfY4uCpu'
    }
  },
  {
    name: 'Leo',
    path: '/artists/leo',
    socials: {
      facebook: 'https://www.facebook.com/mr.aogiac97',
      instagram: 'https://www.instagram.com/le0.astronerd/',
      spotify: 'https://open.spotify.com/artist/3RnnbCQbWxFVHxdfY4uCpu'
    }
  }
];

export default function Artists() {
  const navigate = useNavigate();

  return (
    <div className="artists-page">
      <div className="artists-layout">
        <div className="artists-grid">
          {artists.map((artist) => (
            <div key={artist.name} className="artist-card">
              <button
                type="button"
                onClick={() => navigate(artist.path)}
                className="artist-link-btn"
                aria-label={`Open ${artist.name} page`}
              >
                <FuzzyText
                  className="artist-fuzzy"
                  enableHover
                >
                  {artist.name}
                </FuzzyText>
              </button>

              <ArtistSocialLinks artistName={artist.name} links={artist.socials} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}