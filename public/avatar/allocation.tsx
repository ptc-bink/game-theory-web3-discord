const Allocation = ({ fill = "" }: { fill?: string }) => {
  return (
    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.45 6.43997L6.72998 2.875L3.01001 6.43997" stroke={fill ? fill : "#939393"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.72998 20.125V2.875V20.125Z" fill="#939393" />
      <path d="M6.72998 20.125V2.875" stroke={fill ? fill : "#939393"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.55 16.5601L17.27 20.125L20.99 16.5601" stroke={fill ? fill : "#939393"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.27 2.875V20.125" stroke={fill ? fill : "#939393"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default Allocation;