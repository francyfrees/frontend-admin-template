<template>
  <div
    :class="computedClasses"
    class="material-input__component"
  >
    <div :class="{iconClass:icon}">
      <i
        v-if="icon"
        :class="['el-icon-' + icon]"
        class="el-input__icon material-input__icon"
      />
      <input
        v-if="type === 'email'"
        :id="id"
        v-model="currentValue"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :required="required"
        :clearable="clearable"
        class="material-input"
        type="email"
        @focus="handleFocus(true)"
        @blur="handleBlur(false)"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'url'"
        :id="id"
        v-model="currentValue"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :required="required"
        :clearable="clearable"
        class="material-input"
        type="url"
        @focus="handleFocus(true)"
        @blur="handleBlur(false)"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'number'"
        :id="id"
        v-model="currentValue"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :max="max"
        :min="min"
        :step="step"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        :clearable="clearable"
        class="material-input"
        type="number"
        @focus="handleFocus(true)"
        @blur="handleBlur(false)"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'password'"
        :id="id"
        v-model="currentValue"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :step="step"
        :required="required"
        :clearable="clearable"
        class="material-input"
        type="password"
        @focus="handleFocus(true)"
        @blur="handleBlur(false)"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'tel'"
        :id="id"
        v-model="currentValue"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        :clearable="clearable"
        class="material-input"
        type="tel"
        @focus="handleFocus(true)"
        @blur="handleBlur(false)"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'text'"
        :id="id"
        v-model="currentValue"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        :clearable="clearable"
        class="material-input"
        type="text"
        @focus="handleFocus(true)"
        @blur="handleBlur(false)"
        @input="handleModelInput"
      >
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        v-model="currentValue"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :rows="rows"
        :required="required"
        :clearable="clearable"
        class="material-input"
        @focus="handleFocus(true)"
        @blur="handleBlur(false)"
        @input="handleModelInput"
      />
      <label class="material-label">
        <slot />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class MaterialInput extends Vue {
  @Prop({ type: String, default: '' }) id!: string
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: String, default: '' }) name!: string
  @Prop({ type: String, default: 'text' }) type!: string
  @Prop({ type: [String, Number, Array], default: '' }) value!:
  | string
  | number
  | any[]
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: '' }) min!: string
  @Prop({ type: String, default: '' }) max!: string
  @Prop({ type: Number, default: null }) step!: number
  @Prop({ type: Number, default: null }) minlength!: number
  @Prop({ type: Number, default: null }) maxlength!: number
  @Prop({ type: Number, default: null }) rows!: number
  @Prop({ type: Boolean, default: true }) required!: boolean
  @Prop({ type: String, default: '' }) autoComplete!: string
  @Prop({ type: [Array, String], default: '' }) errorMessages!: any[] | string
  @Prop({ type: Boolean, default: true }) validateEvent!: boolean
  @Prop({ type: Boolean, default: false }) clearable!: boolean
  private currentValue!: string | number | any[]
  private focus!: boolean
  private fillPlaceHolder!: any
  private fillPlaceHolderateEvent!: any
  private data() {
    return {
      currentValue: this.value,
      focus: false,
      fillPlaceHolder: true
    }
  }
  get computedClasses() {
    return {
      'material--active': this.focus,
      'material--disabled': this.disabled,
      'material--raised': Boolean(this.focus || this.currentValue)
    }
  }
  @Watch('value')
  private valueEvent(newValue: any) {
    this.currentValue = newValue
  }
  private handleModelInput(event: any) {
    const value = event.target.value
    this.$emit('input', value)
    if ((<any> this.$parent.$options).componentName === 'ElFormItem') {
      if (this.fillPlaceHolderateEvent) {
        this.$parent.$emit('el.form.change', [value])
      }
    }
    this.$emit('change', value)
  }
  private handleFocus() {
    this.focus = true
    this.$emit('focus', event)
    if (this.placeholder && this.placeholder !== '') {
      this.fillPlaceHolder = this.placeholder
    }
  }
  private handleBlur() {
    this.focus = false
    this.$emit('blur', event)
    this.fillPlaceHolder = null
    if ((<any> this.$parent.$options).componentName === 'ElFormItem') {
      if (this.validateEvent) {
        this.$parent.$emit('el.form.blur', [this.currentValue])
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// Fonts:
$font-size-base: 16px;
$font-size-smallest: 12px;
$font-weight-normal: normal;
$line-height-15: 1.5;
$line-height-2: 2;
// Utils
$spacer: 12px;
$transition: 0.2s ease all;
$index: 0px;
$index-has-icon: 30px;
// Base clases:
%base-bar-pseudo {
  content: '';
  height: 1px;
  width: 0;
  bottom: 0;
  position: absolute;
  transition: $transition;
}
// Theme:
$color-transparent: transparent;
$color-white: rgba(255, 255, 255, 1);
$color-white-30: rgba(255, 255, 255, 0.3);
$color-white-50: rgba(255, 255, 255, 0.5);
$color-white-70: rgba(255, 255, 255, 0.7);
$color-white-90: rgba(255, 255, 255, 0.9);
$color-grey: #9e9e9e;
$color-grey-light: #e0e0e0;
$color-blue: #2196f3;
$color-red: #f44336;
$color-black: black;
@mixin slided-top() {
  top: -1 * $spacer;
  font-size: $font-size-smallest;
}

.material-input__component {
  position: relative;
  * {
    box-sizing: border-box;
  }
  .iconClass {
    .material-input__icon {
      position: absolute;
      left: 0;
      z-index: 100;
      line-height: $font-size-base;
      color: $color-white-90;
      top: $spacer;
      width: $index-has-icon;
      height: $font-size-base;
      font-size: $font-size-base;
      font-weight: $font-weight-normal;
      pointer-events: none;
    }
    .material-label {
      left: $index-has-icon;
    }
    .material-input {
      text-indent: $index-has-icon;
    }
  }
  .material-input {
    font-size: $font-size-base;
    padding: $spacer $spacer $spacer $spacer / 2;
    display: block;
    width: 100%;
    border: 1px solid $color-white-50;
    border-radius: 0;
    color: $color-white;
    &:focus {
      outline: none;
    }
  }

  .material-label {
    position: absolute;
    padding: 2px 6px;
    border-radius: 8px;
    // background-color: rgba(6, 202, 158, 0.4);
    font-size: $font-size-base;
    line-height: 16px;
    font-weight: $font-weight-normal;
    pointer-events: none;
    left: $spacer;
    top: 12px;
    transition: $transition;
  }

  &.material--disabled {
    .material-input {
      color: $color-white-30;
      border-style: dashed;
    }
  }

  &.material--raised {
    .material-label {
      @include slided-top();
      top: -8px;
      color: $color-white-70;
      font-weight: 700;
    }
  }
}
.material-input__component {
  background: $color-transparent;
  .material-input {
    background: none;
    color: $color-white;
    border: 1px solid $color-white-30;
  }
  .material-label {
    color: $color-white-30;
  }
}
</style>