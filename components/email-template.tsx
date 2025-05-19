interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <html>
      <body>
        <div>
          <h1>Welcome, {firstName}!</h1>
        </div>
      </body>
    </html>
  );
}
