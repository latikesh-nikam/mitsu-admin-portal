import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styles from "./activityQillInput.module.scss";
import { useEffect } from 'react';

const QuillActivityInput = (props: any) => {
  const { value, setValue } = props;
  const theme = 'snow';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ],
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'size', 'header',
  ];

  const { quill, quillRef } = useQuill({ theme, modules, formats });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        if(quill.root.innerHTML === '<p><br></p>'){
          setValue("")
        } else {
          setValue(quill.root.innerHTML)
        }
      });
    }
  }, [value, quill, setValue]);

  return (
    <div className={styles.quillWrapper}>
      <div ref={quillRef} />
    </div>
  );
};

export default QuillActivityInput;