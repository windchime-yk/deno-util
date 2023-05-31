export interface Answers {
  count: number;
  datetime: `${string}/${string}/${string}`;
}

export interface ConnpassEvent {
  events: [
    {
      event_id: number;
      title: string;
      catch: string;
      description: string;
      event_url: string;
    },
  ];
}
