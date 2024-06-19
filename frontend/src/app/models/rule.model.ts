export interface Rule {
  id?: number;
  rule_type: string;
  condition: string;
  value: number;
  department: string;
  sequence_id: number;
}
