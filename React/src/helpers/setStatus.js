// Request status map
// 1 =approved, 2 = disapproved 3 =resolved 0 = pending

export default (num) => {
  switch (Number(num)) {
  case 1:
    return 'approved';
  case 2:
    return 'disapproved';
  case 3:
    return 'resolved';
  case 0:
    return 'pending';
  default:
    return null;
  }
};
