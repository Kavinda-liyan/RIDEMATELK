const PopupTableRow = ({ tableHead, tableData }) => {
  return (
    <>
      <tr className="text-[10px] text-left flex w-full">
        <th className="p-[4px]  bg-rmlk-dark-light w-[50%]">{tableHead}</th>
        <td className="p-[4px] border border-rmlk-dark-light w-[50%]">
          {tableData}
        </td>
      </tr>
    </>
  );
};

export default PopupTableRow;
