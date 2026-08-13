import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { getTeamMembers } from "@/app/api/about/about";
import { getTeamCopy } from "@/constants/teamCopy";
import { getImageUrl } from "@/lib/ImageService";

export default async function TeamMembers({ localization = {} }) {
  const teamMembers = await getTeamMembers();
  const copy = getTeamCopy(localization);

  if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) return null;

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const getMemberImageUrl = (member) => {
    if (member.file?.url) {
      return getImageUrl(member.file.url);
    }
    if (member.file?.thumbnailUrl) {
      return getImageUrl(member.file.thumbnailUrl);
    }
    if (member.fileId) {
      return `${API_BASE}/File/GetFile/${member.fileId}`;
    }
    return null;
  };

  return (
    <section className="team-members-section relative bg-gray-50 py-12 sm:py-16 lg:py-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 hidden h-72 w-72 rounded-full bg-accent/5 blur-3xl sm:block" />
      <div className="absolute bottom-0 left-0 hidden h-72 w-72 rounded-full bg-primary/5 blur-3xl sm:block" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealInAnimation direction="up" delay={0.1}>
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="font-accent text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl mb-4">
              {copy.title}
            </h2>
            <p className="text-text/70 max-w-2xl mx-auto text-sm sm:text-base">
              {copy.subtitle}
            </p>
          </div>
        </RevealInAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const imageUrl = getMemberImageUrl(member);
            const name = member.nameTl || member.name || "Team Member";
            const designation = member.designationTl || member.designation;

            return (
              <FaderInAnimation key={member.id || index} direction="up" delay={0.2 + (index * 0.1)}>
                <div className="group flex flex-col items-center bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Profile Image */}
                  <div className="relative h-40 w-40 mb-6 rounded-full overflow-hidden border-4 border-gray-50 shadow-md group-hover:border-accent transition-colors duration-300">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <span className="text-4xl">👤</span>
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <h3 className="font-accent text-xl font-bold text-primary mb-1 text-center capitalize">
                    {name}
                  </h3>
                  {designation && (
                    <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2 text-center">
                      {designation}
                    </p>
                  )}
                  {member.belongCountries && (
                    <p className="text-xs text-text/60 mb-4 text-center font-medium">
                      {member.belongCountries}
                    </p>
                  )}

                  {/* Description */}
                  {member.description && (
                    <div
                      className="text-text/70 text-sm text-center prose prose-sm prose-primary mt-auto [&_*]:bg-transparent [&_*]:!text-inherit"
                      dangerouslySetInnerHTML={{ __html: member.description }}
                    />
                  )}
                </div>
              </FaderInAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
