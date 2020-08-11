import { format, isYesterday, isToday, isSameYear } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const formatDate: (date: Date) => string = date => {
  if (isYesterday(date)) {
    return 'Ontem';
  }

  if (isToday(date)) {
    return 'Hoje';
  }

  if (isSameYear(date, new Date())) {
    return format(date, "dd 'de' MMM", {
      locale: ptBR,
    });
  }

  return format(date, "dd 'de' MMM',' yyyy");
};

export default formatDate;
