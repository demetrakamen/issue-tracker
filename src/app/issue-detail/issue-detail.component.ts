import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssuesService } from '../issues.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css'],
})
export class IssueDetailComponent implements OnInit {
  @Input() issueNo: number | undefined;
  @Input() issue: Issue | undefined;
  @Output() formClose = new EventEmitter();


  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    if(this.issue) {
      this.issueForm.setValue({
        title: this.issue?.title,
        description: this.issue?.description,
        priority: this.issue?.priority,
        type: this.issue?.type,
      });
    }
  }

  updateIssue(): void {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    const updatedIssue = this.issueForm.getRawValue() as Issue;
    updatedIssue.issueNo = this.issue?.issueNo as number;

    this.issueService.editIssue(updatedIssue);
    this.formClose.emit();
  }
}
