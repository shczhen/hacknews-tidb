import * as React from 'react';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import AceEditor, { IAceOptions } from 'react-ace';

import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

// function onChange(newValue: string) {
//   console.log('change', newValue);
// }

export interface AceSQLEditorProps {
  placeholder?: string;
  mode: string;
  theme: string;
  name: string;
  onChange: (newValue: string) => void;
  value: string;
  fontSize?: number;
  showPrintMargin?: boolean;
  showGutter?: boolean;
  highlightActiveLine?: boolean;
  loading?: boolean;
  setOptions?: IAceOptions;
  extra?: ReactNode;
}

export default function AceSQLEditor(props: AceSQLEditorProps) {
  return (
    <AceEditor
      placeholder={props.placeholder}
      mode={props.mode}
      theme={props.theme}
      name={props.name}
      // onLoad={props.onLoad}
      onChange={props.onChange}
      // onSelectionChange={this.onSelectionChange}
      // onCursorChange={this.onCursorChange}
      // onValidate={this.onValidate}
      value={props.value}
      fontSize={props.fontSize}
      showPrintMargin={props.showPrintMargin}
      showGutter={props.showGutter}
      highlightActiveLine={props.highlightActiveLine}
      width="100%"
      height="100%"
      setOptions={props.setOptions}
    />
  );
}
