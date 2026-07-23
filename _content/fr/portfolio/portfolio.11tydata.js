export default {
  test: "test",
  eleventyComputed: {
    async pics(data) {
      const pictures = await this.glob(
        `_images/portfolio/${data.page.fileSlug}/*`,
      );
      return (pictures || []).map((pic) =>
        pic.replace("_images/", "/_images/"),
      );
    },
    async firstPic(data) {
      const previewImageSrc = data.pagePreview?.image?.src;
      const pics = data?.pics;
      const pic = previewImageSrc || (Array.isArray(pics) && pics[0]) || null;
      if (typeof pic === "string" && pic.length > 0 && !pic.startsWith("/")) {
        return `/${pic}`;
      }

      return pic;
    },
    //     playProjects: (data) => {
    //       if (!data.orfeoId) return { future: [], past: [] };
    //       const all = data.orfeo.projects.filter(
    //         (p) => p.venue_data?.name && p.spectacle?.pk === data.orfeoId,
    //       );
    //       return {
    //         // all,
    //         future: all.filter((p) => !p.past && !p.ignore),
    //         past: all.filter((p) => p.past && !p.ignore),
    //       };
    //     },
  },
};
