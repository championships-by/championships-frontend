export const generateColumns = (data, render) => {
  if (data && data[0] && data[0].attempts) {
    return data[0].attempts.map((attempt, i) => ({
      key: `attempt-${i}`,
      dataIndex: `attempt-${i}`,
      title: `Попытка №${i + 1}`,
      render: (text, record, index) => render(text, record, index, i),
    }));
  }

  return [];
};
