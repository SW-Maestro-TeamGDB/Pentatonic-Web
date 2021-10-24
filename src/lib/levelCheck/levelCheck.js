const levelCheck = (value) => {
  if (1 <= value && value < 5) return 1;
  else if (5 <= value && value < 10) return 2;
  else if (10 <= value && value < 50) return 3;
  else if (50 <= value && value < 100) return 4;
  else if (100 <= value) return 5;
  else return 0;
};

export { levelCheck };
