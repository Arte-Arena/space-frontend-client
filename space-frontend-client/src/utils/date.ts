import moment from "moment";

export const formatDate = (dateString: string): string => {
  moment.locale("pt-br");
  return moment.utc(dateString).format("DD/MM/YYYY");
};

export const formatDateTime = (dateString: string): string => {
  moment.locale("pt-br");
  return moment.utc(dateString).format("DD/MM/YYYY HH:mm");
};

export const getRelativeTime = (dateString: string): string => {
  moment.locale("pt-br");
  return moment(dateString).fromNow();
};
