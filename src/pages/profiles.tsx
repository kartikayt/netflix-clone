import ListProfiles from "../components/listProfiles";

export default function Profiles({ edit = false }: { edit?: boolean }) {
  return (
    <article className="grid min-h-screen place-content-center place-items-center">
      <ListProfiles edit={edit} />
    </article>
  );
}
