import CoverCard from "../component/CoverCard";

function WebcomicMainPage() {
  return (
    <div className="p-16">
      <div className="flex flex-wrap justify-center gap-15">
        <CoverCard
          image="covers/unarmedKnight.webp"
          imageOnHover="covers/unarmedKnightHover.webp"
          title="Knight Tales (ES)"
          href="/webcomic/es/knighttales/ch1/0"
        />
      </div>
    </div>
  );
}

export default WebcomicMainPage;
