import { Editor } from '@tinymce/tinymce-react'
import DOMPurify from 'isomorphic-dompurify'

type props = {
    content: string | undefined,
    onChange: Function
}

export default function TinyEditor({ content, onChange }: props) {
    return (
        <Editor
            tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
            value={DOMPurify.sanitize(content as string)}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | \
                    table | help',
                skin_url: '/assets/libs/tinymce/skins/ui/oxide', // Static files path(step 2)
                content_css: '/assets/libs/tinymce/skins/content/default/content.min.css'  // Static files path(step 2)
            }}
            onEditorChange={(e) => onChange(e)}
        />
    );
}