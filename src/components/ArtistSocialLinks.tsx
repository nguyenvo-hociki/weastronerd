import { FaFacebookF, FaInstagram, FaSpotify } from "react-icons/fa";

type ArtistSocialLinksProps = {
  artistName: string;
  links: {
    facebook: string;
    instagram: string;
    spotify: string;
  };
};

export default function ArtistSocialLinks({ artistName, links }: ArtistSocialLinksProps) {
  return (
    <div className="artist-socials" aria-label={`${artistName} social links`}>
      <a
        className="artist-social-link"
        href={links.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label={`${artistName} on Facebook`}
      >
        <FaFacebookF className="artist-social-icon" aria-hidden="true" />
      </a>

      <a
        className="artist-social-link"
        href={links.instagram}
        target="_blank"
        rel="noreferrer"
        aria-label={`${artistName} on Instagram`}
      >
        <FaInstagram className="artist-social-icon" aria-hidden="true" />
      </a>

      <a
        className="artist-social-link"
        href={links.spotify}
        target="_blank"
        rel="noreferrer"
        aria-label={`${artistName} on Spotify`}
      >
        <FaSpotify className="artist-social-icon" aria-hidden="true" />
      </a>
    </div>
  );
}
