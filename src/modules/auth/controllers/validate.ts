export const validateSort = (sorts: any[]) => {
  sorts.forEach((sort) => {
    const formatSort = String(sort).toUpperCase();
    if (sort && formatSort !== "ASC" && formatSort !== "DESC") {
      throw new Error("Sort must be asc or desc");
    }
  });
};
