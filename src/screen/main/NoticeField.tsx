import FlexBox from "@modules/layout/FlexBox";
import { useEffect, useRef, useState } from "react";

interface TextCheckFieldProps {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  ischecked?: boolean;
  setIschecked?: React.Dispatch<React.SetStateAction<boolean>>;
  inactive?: boolean;
}

export default function NoticeField({
  value,
  setValue,
  ischecked,
  setIschecked,
  inactive,
  ...props
}: TextCheckFieldProps & JSX.IntrinsicElements["textarea"]) {
  const [height, setHeight] = useState<string>("0px");
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
    setHeight(
      `${ref.current?.scrollHeight ? ref.current?.scrollHeight : "0"}px`,
    );
  }, [focus]);

  const handleFocus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFocus(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocus(false);
    props.onBlur && props.onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue && setValue(e.target.value);
    props.onChange && props.onChange(e);
    setHeight(
      `${ref.current?.scrollHeight ? ref.current?.scrollHeight : "0"}px`,
    );
  };

  return (
    <FlexBox className="w-full justify-between p-4 bg-Gray1 rounded-lg">
      <button
        type="button"
        onClick={handleFocus}
        className="h-full w-full flex flex-col justify-center cursor-text"
      >
        {focus ? (
          <textarea
            {...props}
            ref={ref}
            className={`${focus ? "visible" : "invisible"} !leading-[22px]
            B4-regular text-black w-full break-words bg-transparent outline-none overflow-hidden`}
            value={value}
            onChange={handleChange}
            onFocus={e => {
              e.target.selectionStart = e.target.value.length;
              props.onFocus && props.onFocus(e);
            }}
            onBlur={handleBlur}
            style={{ height }}
            placeholder=""
          />
        ) : (
          <FlexBox direction="col" className="w-full gap-2 items-start">
            {(value || props.placeholder)?.split("\n")?.map((line, index) => {
              return (
                <div
                  key={index}
                  className={`B4-regular ${inactive || !value ? "text-Gray4" : "text-black"}`}
                >
                  {line}
                </div>
              );
            })}
          </FlexBox>
        )}
      </button>
    </FlexBox>
  );
}
