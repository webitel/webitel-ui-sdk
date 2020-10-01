<template>
  <section class="modules">
    <h2>Export Files</h2>
    <article class="module">
      <p>Includes <b>FilesExport class</b> and <b>exportFilesMixin</b> in <b>/mixins</b> folder to
        wrap module logic and attach it to component easily.</p>
      <div><span>Usage: </span>
        <pre><code class="language-javascript">
          created() {
            this.initFilesExport({
              fetchMethod, // API call method
              filename, // name of downloaded file. default is 'files'
              filesURL, // Function. accepts file id param, and generates download link for file
            });
          }
        </code></pre>
        and then:
        <pre><code class="language-html">
          &lt;!-- if files are passed, just downloads them by their ids.--&gt;
          &lt;!-- If not, tries to get selectedItems files (if there are any selected).--&gt;
          &lt;!-- If not, fetches files from fetchMethod with passed params (if any).--&gt;
          @click="exportFiles(files?, params?)"
        </code></pre></div>
      <br>
      <p>In data, mixin has <b>FilesExport</b> property to control FilesExport class instance.</p>
      <p>In computed, mixin has <b>filesDownloadProgress</b> and <b>filesZippingProgress</b> for files fetch
        and archive generation. <b>isFilesLoading</b> computed boolean indicator tracks loading progress
        like <code class="language-javascript">filesDownloadProgress || filesZippingProgress</code></p>
      <p><code class="language-javascript">this.FilesExport</code> has progress tracking properties:
      <code class="language-javascript">downloadProgress = { count: 0 }; zippingProgress = { percent: 0 };</code>
      and <code class="language-javascript">filesURL</code> method property that could be overridden.
      (be default is)
      <pre><code class="language-javascript">
        (id) => {
          const token = localStorage.getItem('access-token');
          const BASE_URL = process.env.VUE_APP_API_URL;
          return `${BASE_URL}/storage/recordings/${id}/stream?access_token=${token}`;
        };
    </code></pre>
      but highly recommended to be overridden.
    </p>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'export-files-module-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
