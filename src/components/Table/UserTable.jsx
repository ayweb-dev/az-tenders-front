import React from 'react';

const UserTable = ({ item }) => {
  return (
    <div className="container mx-auto p-4 ">
      <table className="table datatable w-full border border-black text-center dark:bg-gray-300">
        <thead className='bg-blue-300'>
          <tr>
            <th className="border-b border-black p-2">Title</th>
            <th className="border-b border-black p-2">Year</th>
            <th className="border-b border-black p-2">Runtime</th>
            <th className="border-b border-black p-2">Director</th>
          </tr>
        </thead>
        <tbody>
        {item.length > 0 ? (
          item.map((Val) => (
            <tr key={Val.id} className="hover:bg-gray-100">
              <td className="border-b border-black p-2">{Val.title}</td>
              <td className="border-b border-black p-2">{Val.year}</td>
              <td className="border-b border-black p-2">{Val.runtime} mins</td>
              <td className="border-b border-black p-2">{Val.director}</td>
            </tr>
          )) 
        ) : (
            <tr>
              <td colSpan="4" className="border-b border-black p-2">Aucun professeur trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
