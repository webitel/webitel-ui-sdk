<template>
  <section class="modules">
    <h2>Export CSV</h2>
    <article class="module">
      <p>Includes <b>CSVExport class</b> and <b>exportCSVMixin</b> in <b>/mixins</b> folder to
        wrap module logic and attach it to component easily.</p>
      <div><span>Usage: </span>
        fetchMethod -- API call method,
        options: { filename: String // name of downloaded file }
        <pre><code class="language-javascript">
          created() {
            this.initCSVExport(fetchMethod, options);
          }
        </code></pre>
        and then:
        <pre><code class="language-html">@click="exportCSV(params)"</code></pre>
        params is usually a filters query params ( default: $route.query);
      </div>
      <br>
      <p>In data, has <b>isCSVLoading</b> boolean indicator to track loading progress and <b>CSVExport</b>
      property to control CSVExport class instance.</p>
      <p>In computed, mixin has <b>CSVDownloadProgress</b> for files fetch
        and archive generation and <b>isCSVLoading</b> computed boolean indicator to track loading progress</p>
      <p>Exporting of <b>selected rows</b> only relies on <b>selectedIds</b> and
        <b>isAnySelected</b> computed properties.
      By default, they are computed like</p>
      <pre><code class="language-javascript">
      selectedIds() {
        return this.dataList
          .filter((item) => item._isSelected)
          .map((item) => item.id);
      },
      isAnySelected() {
        return this.selectedIds.length;
      },
        </code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'export-csv-module-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
