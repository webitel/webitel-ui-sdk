import { saveAs } from 'file-saver';

const saveAsJSON = (name, content) => {
  const fileName = name.replace(/[ ,]+/g, '-');
  const file = new Blob([JSON.stringify(content, null, 4)], { type: 'application/json' });
  saveAs(file, fileName);
};

export default saveAsJSON;
