import { ArrowDown } from "lucide-react";
import Button from "../Button/Button";


const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/3TyprhBD9jJN1NDb8";
export default function GoogleReviewsLink() {
      return (
    <Button
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      buttonStyle="primary"
    >
      Google-anmeldelser
      <ArrowDown size={18} aria-hidden="true" />  
    </Button>
  );
}
