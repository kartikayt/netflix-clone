import { ENDPOINTS } from "../common/endpoints";
import ContentRow from "../components/content_row";

export default function Browse() {
  return (
    <section>
      <section>Banner</section>
      <ContentRow endpoint={ENDPOINTS.MOVIE_PLAYING} title={"Now Playing"} />
      <ContentRow endpoint={ENDPOINTS.MOVIES_POPULAR} title={"New & Popular"} />
      <ContentRow endpoint={ENDPOINTS.MOVIE_TOP_RATED} title={"Top Rated"} />
      <ContentRow endpoint={ENDPOINTS.MOVIE_UPCOMING} title={"Upcoming"} />
    </section>
  );
}
