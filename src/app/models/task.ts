export interface Task{
    completed:boolean;
    id: string;
    assigner_id: string;
    assignee_id: string;
    project_id: string;
    section_id: string;
    parent_id: string;
    order: number;
    content: string;
    description: string;
    is_completed: boolean;
    labels: [];
    priority: number;
    comment_count: number;
    creator_id: string;
    created_at: string;
    due: string;
    url: string;
    
}
export class EditableTask {
    constructor(
      public content: string,
    ) {}
  }
