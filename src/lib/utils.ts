import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (date: Date | string, isId: boolean) => {
  if (isId) {
    return format(date, "EEEE,d MMMM yyyy", { locale: id });
  }
  return format(date, "EEEE,d MMMM yyyy");
};
