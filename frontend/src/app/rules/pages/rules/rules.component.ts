import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../../services/rule.service';
import { Rule } from '../../../models/rule.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';
import { DepartmentsService } from '../../../services/departments.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss',
})
export class RulesComponent {
  rules: Rule[] = [];
  dataSource: MatTableDataSource<Rule> = new MatTableDataSource();
  ruleForm: FormGroup;
  departments: any[] = [];
  isUpdate: boolean = false;
  selectedRuleForUpdation!: any;
  displayedColumns: string[] = [
    'sequence',
    'ruleType',
    'condition',
    'value',
    'department',
    'actions',
  ];

  conditions = [
    { value: 'lt', label: 'Less Than' },
    { value: 'lte', label: 'Less Than or Equal To' },
    { value: 'gt', label: 'Greater Than' },
    { value: 'gte', label: 'Greater Than or Equal To' },
    { value: 'eq', label: 'Equal To' },
  ];

  constructor(
    private departmentService: DepartmentsService,
    private ruleService: RuleService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.ruleForm = this.fb.group({
      rule_type: ['', Validators.required],
      condition: ['', Validators.required],
      value: [, [Validators.required, Validators.min(0)]],
      department: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.loadRules();
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  loadRules(): void {
    this.ruleService.getRules().subscribe((rules: any[]) => {
      this.rules = rules;
      this.dataSource = new MatTableDataSource(this.rules);
    });
  }

  getDepartmetById(value: any) {
    let departmentName = this.departments.find((dep: any) => dep.id === value);
    return departmentName?.name;
  }

  getConditionByValue(value: any) {
    let label = this.conditions.find((con: any) => con.value === value || null);
    return label?.label;
  }

  addRule(): void {
    if (this.ruleForm.valid) {
      const newRule: Rule = this.ruleForm.value;
      newRule.sequence_id = this.rules.length + 1;
      this.ruleService.createRule(newRule).subscribe((rule) => {
        this.rules.push(rule);
        this.switchToAddForm();
      });
    }
  }

  switchToAddForm() {
    this.isUpdate = false;
    this.ruleForm.reset({
      rule_type: '',
      condition: '',
      value: 0,
      department: '',
    });
  }
  updateFormDataUpdation(rule: Rule): void {
    this.ruleForm.patchValue({
      rule_type: rule.rule_type,
      condition: rule.condition,
      value: rule.value,
      department: rule.department,
    });
    this.selectedRuleForUpdation = rule;
    this.isUpdate = true;
  }

  updateRule() {
    const newRule: Rule = this.ruleForm.value;
    newRule.sequence_id = this.selectedRuleForUpdation.sequence_id;
    this.ruleService
      .updateRule(newRule, this.selectedRuleForUpdation.id)
      .subscribe((rule) => {
        this.loadRules();
      });
  }

  deleteRule(id: any): void {
    this.ruleService.deleteRule(id).subscribe(() => {
      this.rules = this.rules.filter((rule) => rule.id !== id);
    });
  }

  updateSequence(updatedSequence: any): void {
    this.ruleService.updateRuleSequence(updatedSequence).subscribe((rule) => {
      this.loadRules();
    });
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.rules, event.previousIndex, event.currentIndex);
    this.dataSource.data = this.rules;
    this.cdr.detectChanges();
    this.updateSequence(this.getCurrentIndexArray());
  }

  getCurrentIndexArray(): { id: any; currentIndex: number }[] {
    return this.rules.map((rule, index) => ({
      id: rule.id,
      currentIndex: index + 1,
    }));
  }
}
